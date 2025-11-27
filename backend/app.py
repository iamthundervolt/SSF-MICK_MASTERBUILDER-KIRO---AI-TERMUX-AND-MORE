#!/usr/bin/env python3
"""
KIRO Masterbuilder - Flask Backend
Launches Linux distros with GUI in new windows
"""

from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import docker
import subprocess
import os
import random
import json

app = Flask(__name__)
CORS(app)  # Allow requests from browser

# Docker client
try:
    docker_client = docker.from_env()
except:
    docker_client = None
    print("⚠️  Docker not available - will use simulation mode")

# Active containers
active_containers = {}

@app.route('/')
def index():
    return jsonify({
        'status': 'KIRO Backend Running',
        'version': '1.0',
        'features': ['debian', 'ubuntu', 'alpine', 'xfce', 'vnc']
    })

@app.route('/api/container/create', methods=['POST'])
def create_container():
    """Create a new Linux container with GUI"""
    data = request.json
    name = data.get('name', 'debian-desktop')
    distro = data.get('distro', 'debian')
    gui = data.get('gui', 'xfce')
    
    if not docker_client:
        return jsonify({
            'status': 'error',
            'message': 'Docker not available. Install Docker Desktop first.',
            'simulation': True
        }), 503
    
    try:
        # VNC port (random to avoid conflicts)
        vnc_port = random.randint(5900, 5999)
        web_port = random.randint(6080, 6180)
        
        # Docker image based on distro
        images = {
            'debian': 'dorowu/ubuntu-desktop-lxde-vnc:latest',  # Debian-based
            'ubuntu': 'dorowu/ubuntu-desktop-lxde-vnc:latest',
            'xfce': 'consol/debian-xfce-vnc:latest'
        }
        
        image = images.get(distro, images['debian'])
        
        # Pull image if not exists
        try:
            docker_client.images.get(image)
        except:
            print(f"📦 Pulling image {image}...")
            docker_client.images.pull(image)
        
        # Create container
        container = docker_client.containers.run(
            image,
            name=name,
            detach=True,
            ports={
                '5900/tcp': vnc_port,
                '6080/tcp': web_port
            },
            environment={
                'VNC_PASSWORD': 'kiro2024',
                'RESOLUTION': '1920x1080'
            },
            remove=True
        )
        
        # Store container info
        active_containers[name] = {
            'id': container.id,
            'name': name,
            'distro': distro,
            'gui': gui,
            'vnc_port': vnc_port,
            'web_port': web_port,
            'status': 'running',
            'url': f'http://localhost:{web_port}'
        }
        
        return jsonify({
            'status': 'success',
            'container': active_containers[name],
            'message': f'Container {name} created! Access at http://localhost:{web_port}'
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/container/start/<name>', methods=['POST'])
def start_container(name):
    """Start an existing container"""
    if name not in active_containers:
        return jsonify({
            'status': 'error',
            'message': f'Container {name} not found'
        }), 404
    
    container_info = active_containers[name]
    
    try:
        container = docker_client.containers.get(container_info['id'])
        if container.status != 'running':
            container.start()
        
        return jsonify({
            'status': 'success',
            'container': container_info,
            'url': container_info['url']
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/container/stop/<name>', methods=['POST'])
def stop_container(name):
    """Stop a running container"""
    if name not in active_containers:
        return jsonify({
            'status': 'error',
            'message': f'Container {name} not found'
        }), 404
    
    try:
        container = docker_client.containers.get(active_containers[name]['id'])
        container.stop()
        
        return jsonify({
            'status': 'success',
            'message': f'Container {name} stopped'
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/container/list', methods=['GET'])
def list_containers():
    """List all containers"""
    return jsonify({
        'status': 'success',
        'containers': list(active_containers.values())
    })

@app.route('/api/container/remove/<name>', methods=['DELETE'])
def remove_container(name):
    """Remove a container"""
    if name not in active_containers:
        return jsonify({
            'status': 'error',
            'message': f'Container {name} not found'
        }), 404
    
    try:
        container = docker_client.containers.get(active_containers[name]['id'])
        container.stop()
        container.remove()
        del active_containers[name]
        
        return jsonify({
            'status': 'success',
            'message': f'Container {name} removed'
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check"""
    docker_available = docker_client is not None
    
    return jsonify({
        'status': 'healthy',
        'docker': docker_available,
        'active_containers': len(active_containers),
        'version': '1.0'
    })

if __name__ == '__main__':
    print("╔════════════════════════════════════════════════════════════╗")
    print("║         KIRO MASTERBUILDER - Flask Backend               ║")
    print("╚════════════════════════════════════════════════════════════╝")
    print("")
    print("🚀 Starting Flask server...")
    print("📦 Docker support:", "✅ Available" if docker_client else "❌ Not available")
    print("🌐 Server will run on: http://localhost:5000")
    print("")
    print("API Endpoints:")
    print("  POST /api/container/create  - Create new container")
    print("  POST /api/container/start/<name>  - Start container")
    print("  POST /api/container/stop/<name>   - Stop container")
    print("  GET  /api/container/list    - List containers")
    print("  DELETE /api/container/remove/<name> - Remove container")
    print("")
    
    app.run(host='0.0.0.0', port=5000, debug=True)
