# docker

1.docker image build -t project-startup:0.0.1
2.docker image ls
3.docker run --rm -v "$(PWD)":/webApp project-startup:0.0.1 npm run build:prod
4.docker container ls --all
5.docker container kill [containerID]
6.docker container rm [containerID]
7.docker container start [containerID]
8.docker container stop [containerID]
9.docker save -o test-docker project-startup:0.0.1
10.docker load < [filename] 或者 docker load --load [filename]