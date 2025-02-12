pipeline {
    agent any  

    environment {
        GITHUB_REPO = 'https://github.com/Code9X/CICD-Jenkins-Docker.git'
        DOCKER_IMAGE_FRONTEND = 'bookingwiz_frontend'
        DOCKER_IMAGE_BACKEND = 'bookingwiz_backend'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend (React)') {
            agent {
                docker {
                    image 'node:18' // Use Node.js Docker image
                    args '-v $HOME/.npm:/root/.npm' // Cache npm packages
                }
            }
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Build Backend (.NET)') {
            agent {
                docker {
                    image 'mcr.microsoft.com/dotnet/sdk:7.0' // Use .NET SDK Docker image
                }
            }
            steps {
                sh 'dotnet restore'
                sh 'dotnet build --configuration Release'
                sh 'dotnet test' // Add tests if applicable
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Build frontend image
                    docker.build("${DOCKER_IMAGE_FRONTEND}", '-f BookingWiz_Web/Dockerfile .')

                    // Build backend image
                    docker.build("${DOCKER_IMAGE_BACKEND}", '-f BookingWiz_Admin/Dockerfile .')
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Skipping Kubernetes deployment for now.'
            }
        }
    }

    post {
        always {
            cleanWs() // Clean workspace after build
        }
        success {
            echo 'Build successful! Kubernetes deployment skipped.'
        }
        failure {
            echo 'Build failed! Check logs for details.'
        }
    }
}
