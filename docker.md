# docker command

- `docker image build -t project-startup:0.0.1`
- `docker image ls`
- `docker run --rm -v "$(PWD)":/webApp project-startup:0.0.1 npm run build:prod`
- `docker container ls --all`
- `docker container kill [containerID]`
- `docker container rm [containerID]`
- `docker container start [containerID]`
- `docker container stop [containerID]`
- `docker save -o test-docker project-startup:0.0.1`
- `docker load < [filename]` or `docker load --load [filename]`