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
                    bat "git clone https://%GITHUB_USER%:%GITHUB_PAT%@github.com/Code9X/CICD-Jenkins-Docker.git ."
                }
            }
        }

        stage('Build Frontend (React)') {
            steps {
                bat "npm install"
                bat "npm run build"
            }
        }

        stage('Build Backend (.NET)') {
            steps {
                bat "dotnet restore"
                bat "dotnet build --configuration Release"
            }
        }

        stage('Build Docker Images') {
            steps {
                bat "docker build -t %DOCKER_IMAGE_FRONTEND% -f BookingWiz_Web/Dockerfile ."
                bat "docker build -t %DOCKER_IMAGE_BACKEND% -f BookingWiz_Admin/Dockerfile ."
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat "kubectl apply -f k8s/"
            }
        }
    }

    post {
        always {
            bat "echo Pipeline finished with status: %ERRORLEVEL%"
        }
        success {
            bat "echo Build and deployment successful!"
        }
        failure {
            bat "echo Build failed! Check logs for details."
        }
    }
}
