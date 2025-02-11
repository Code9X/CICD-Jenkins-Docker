pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'code9x'
    }

    stages {
        stage('Checkout Code') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'github-token', usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_PAT')]) {
                    sh 'git clone https://$GITHUB_USER:$GITHUB_PAT@github.com/Code9X/CICD-Jenkins-Docker.git .'
                }
            }
        }

        stage('Build Frontend (React)') {
            steps {
                script {
                    docker.image('node:20').inside {
                        sh '''
                        echo "Installing React dependencies..."
                        npm install
                        echo "Building React frontend..."
                        npm run build
                        '''
                    }
                }
            }
        }

        stage('Build Backend (.NET)') {
            steps {
                script {
                    docker.image('mcr.microsoft.com/dotnet/sdk:8.0').inside {
                        sh '''
                        echo "Restoring .NET dependencies..."
                        dotnet restore
                        echo "Building .NET backend..."
                        dotnet build --configuration Release
                        echo "Publishing .NET application..."
                        dotnet publish -c Release -o out
                        '''
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                echo "Building Docker images..."
                docker build -t $DOCKER_HUB_USER/bookingwiz-frontend:latest -f BookingWiz_Web/Dockerfile .
                docker build -t $DOCKER_HUB_USER/bookingwiz-admin:latest -f BookingWiz_Admin/Dockerfile .
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying to Kubernetes (Placeholder - Will be implemented after Kubeconfig setup)'
            }
        }
    }

    post {
        always {
            sh '''
            echo "Cleaning up unused Docker resources..."
            docker system prune -f
            '''
        }
    }
}
