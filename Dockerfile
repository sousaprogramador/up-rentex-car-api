FROM node:18-alpine3.17

RUN npm install -g @nestjs/cli@8.2.5 npm@8.5.5

ENV JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"

USER node

WORKDIR /home/node/app

#RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.2/zsh-in-docker.sh)" -- \
#  -t https://github.com/romkatv/powerlevel10k \
#  -p git \
#  -p git-flow \
#  -p https://github.com/zdharma-continuum/fast-syntax-highlighting \
#  -p https://github.com/zsh-users/zsh-autosuggestions \
#  -p https://github.com/zsh-users/zsh-completions \
#  -a 'export TERM=xterm-256color'

RUN echo '[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh' >> ~/.zshrc && \
  echo 'HISTFILE=/home/node/zsh/.zsh_history' >> ~/.zshrc 

CMD [ "tail", "-f" , "/dev/null" ]
ENTRYPOINT ["sh", ".docker/start.sh"]