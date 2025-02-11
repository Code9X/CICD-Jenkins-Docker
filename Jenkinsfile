pipeline {
    agent any  // Runs on any available Jenkins agent

    environment {
        GITHUB_REPO = 'https://github.com/Code9X/CICD-Jenkins-Docker.git'
        DOCKER_IMAGE_FRONTEND = 'bookingwiz_frontend'
        DOCKER_IMAGE_BACKEND = 'bookingwiz_backend'
    }

    stages {
        stage('Checkout Code') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'github-token', usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_PAT')]) {
                    bat '''
                    echo "Cloning repository..."
                    git clone https://%GITHUB_USER%:%GITHUB_PAT%@github.com/Code9X/CICD-Jenkins-Docker.git .
                    '''
                }
            }
        }

        stage('Build Frontend (React)') {
            steps {
                bat '''
                echo "Installing React dependencies..."
                npm install
                echo "Building React frontend..."
                npm run build
                '''
            }
        }

        stage('Build Backend (.NET)') {
            steps {
                bat '''
                echo "Restoring .NET dependencies..."
                dotnet restore
                echo "Building .NET backend..."
                dotnet build --configuration Release
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                bat '''
                echo "Building Docker images..."
                docker build -t %DOCKER_IMAGE_FRONTEND% -f BookingWiz_Web/Dockerfile .
                docker build -t %DOCKER_IMAGE_BACKEND% -f BookingWiz_Admin/Dockerfile .
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat '''
                echo "Deploying to Kubernetes..."
                kubectl apply -f k8s/
                '''
            }
        }
    }

    post {
        always {
            bat 'echo "Pipeline finished with status: ${currentBuild.currentResult}"'
        }
        success {
            bat 'echo "Build and deployment successful!"'
        }
        failure {
            bat 'echo "Build failed! Check logs for details."'
        }
    }
}
