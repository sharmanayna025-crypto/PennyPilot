pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'naynasharma'
        BACKEND_IMAGE = 'naynasharma/pennypilot-backend'
        FRONTEND_IMAGE = 'naynasharma/pennypilot-frontend'
        K8S_NAMESPACE = 'pennypilot'
        PATH = "/usr/local/bin:/usr/bin:/bin"
        KUBECONFIG = '/var/lib/jenkins/.kube/config'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t $BACKEND_IMAGE:$BUILD_NUMBER ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build --build-arg VITE_API_URL=/api -t $FRONTEND_IMAGE:$BUILD_NUMBER ./frontend'
            }
        }

        stage('Login and Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DH_USER',
                    passwordVariable: 'DH_TOKEN'
                )]) {
                    sh '''
                        set -e
                        echo "$DH_TOKEN" | docker login -u "$DH_USER" --password-stdin

                        docker tag "$BACKEND_IMAGE:$BUILD_NUMBER" "$BACKEND_IMAGE:latest"
                        docker tag "$FRONTEND_IMAGE:$BUILD_NUMBER" "$FRONTEND_IMAGE:latest"

                        docker push "$BACKEND_IMAGE:$BUILD_NUMBER"
                        docker push "$BACKEND_IMAGE:latest"
                        docker push "$FRONTEND_IMAGE:$BUILD_NUMBER"
                        docker push "$FRONTEND_IMAGE:latest"

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    set -e

                    /usr/local/bin/kubectl set image deployment/pennypilot-backend \
                        backend=$BACKEND_IMAGE:$BUILD_NUMBER \
                        -n $K8S_NAMESPACE

                    /usr/local/bin/kubectl set image deployment/pennypilot-frontend \
                        frontend=$FRONTEND_IMAGE:$BUILD_NUMBER \
                        -n $K8S_NAMESPACE

                    /usr/local/bin/kubectl patch deployment pennypilot-backend \
                        -n $K8S_NAMESPACE --type=strategic \
                        -p '{"spec":{"template":{"spec":{"containers":[{"name":"backend","imagePullPolicy":"Always"}]}}}}'

                    /usr/local/bin/kubectl patch deployment pennypilot-frontend \
                        -n $K8S_NAMESPACE --type=strategic \
                        -p '{"spec":{"template":{"spec":{"containers":[{"name":"frontend","imagePullPolicy":"Always"}]}}}}'

                    /usr/local/bin/kubectl rollout status deployment/pennypilot-backend \
                        -n $K8S_NAMESPACE --timeout=300s

                    /usr/local/bin/kubectl rollout status deployment/pennypilot-frontend \
                        -n $K8S_NAMESPACE --timeout=300s
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '/usr/local/bin/kubectl get deployments,pods,services -n $K8S_NAMESPACE'
            }
        }
    }
}
