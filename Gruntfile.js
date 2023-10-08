module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less' // arquivo de saida
                }
            }, //configuração do plugin - cria e compila os arquivos modo dev
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less' // arquivo de saida
                } //cria e compila os arquivos lado cliente
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            }, //faz com que todas as alterações fiquem automatizadas no browser
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        }, 
        clean: ['prebuild'], // elimina pasta que indicar
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }
    }) 

    grunt.loadNpmTasks('grunt-contrib-less'); //inserção do plugin apos instalado o pacote: npm i --save-dev grunt-contrib-less
    grunt.loadNpmTasks('grunt-contrib-watch'); //inserção do plugin apos instalado o pacote: npm i --save-dev grunt-contrib-watch
    grunt.loadNpmTasks('grunt-replace'); //inserção do plugin apos instalado o pacote: npm i --save-dev grunt-replace 
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); //inserção do plugin apos instalado o pacote: npm i --save-dev grunt-contrib-min
    grunt.loadNpmTasks('grunt-contrib-clean'); //inserçaõ do plugin apos instalado o pacote: npm i --save-dev grunt-contrib-clean
    grunt.loadNpmTasks('grunt-contrib-uglify'); //inserçaõ do plugin apos instalado o pacote: npm i --save-dev grunt-contrib-uglify

    grunt.registerTask('default', ['watch']); //array de declaração do plugin para execução modo desenvolvimento
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']); // para habilitar modo produção na vercel

}