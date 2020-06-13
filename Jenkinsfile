pipeline {
  agent any

  tools {nodejs "node"}

  stages {
    stage("Build") {
      steps {
        echo 'Fazendo build da aplicação'

        sh "ssh deploy@67.205.162.29 './scripts/start.sh'"

        echo 'Build finalizado'
      }
    }
  }
}
