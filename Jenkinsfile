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
                withCredentials([usernamePassword(credentialsId: 'github-token', usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_PAT')]) {
                    powershell "git clone https://%GITHUB_USER%:%GITHUB_PAT%@github.com/Code9X/CICD-Jenkins-Docker.git ."
                }
            }
        }

        stage('Build Frontend (React)') {
            steps {
                powershell "npm install"
                powershell "npm run build"
            }
        }

        stage('Build Backend (.NET)') {
            steps {
                powershell "dotnet restore"
                powershell "dotnet build --configuration Release"
            }
        }

        stage('Build Docker Images') {
            steps {
                powershell "docker build -t %DOCKER_IMAGE_FRONTEND% -f BookingWiz_Web/Dockerfile ."
                powershell "docker build -t %DOCKER_IMAGE_BACKEND% -f BookingWiz_Admin/Dockerfile ."
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                powershell "kubectl apply -f k8s/"
            }
        }
    }

    post {
        always {
            powershell "echo Pipeline finished with status: $LASTEXITCODE"
        }
        success {
            powershell "echo Build and deployment successful!"
        }
        failure {
            powershell "echo Build failed! Check logs for details."
        }
    }
}
