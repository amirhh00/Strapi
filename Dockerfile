# https://github.com/kevinadhiguna/strapi-dockerize
# One can use the keyword 'FROM' to do that.
# In our example, we want to import the Strapi image. So we write 'strapi/base' for the image name. ':14' is a tag that means we use NodeJS v14 (The latest LTS version).
FROM strapi/base:14

# Set up working directory that will be used to copy files/directories below :
WORKDIR /app

# Copy package.json to root directory inside Docker container of Strapi app
COPY package.json .

# Copy yarn.lock to root directory inside Docker container of Strapi app
COPY yarn.lock .

# Install dependencies, but not generate a yarn.lock file and fail if an update is needed (for more : https://classic.yarnpkg.com/en/docs/cli/install/#toc-yarn-install-frozen-lockfile).
RUN yarn install --frozen-lockfile

# == Copy required files ==
# In order to launch our Strapi app, we must import it into our image.
# We use the keyword 'COPY' to do that.
# The first parameter is the name of the file on the host.
# The second parameter is the path where to put the file on the image.
# '.' or '/' means the file will be put in the image root folder.
COPY favicon.ico .
COPY public/robots.txt public/
COPY public/index.html public/
COPY extensions/ extensions/
# COPY exports/ exports/
COPY api/ api/
COPY config/ config/

# Generate a folder called 'build' which is the folder where files will be stored that can be directly used by others without the need to compile or minify the source code that is being reused.
RUN yarn build

# Run on port 1337
EXPOSE 1337

# We need to define the command to launch when we are going to run the image. We can use the keyword 'CMD' to do that.
# The following command will execute "yarn start".
CMD ["yarn", "start"]

# FROM node:16-alpine3.14
# WORKDIR /app 

# COPY yarn.lock package.json /app/ 
# RUN yarn install 

# COPY . /app

# ARG PGDATABASE PGHOST PGPASSWORD PGPORT PGUSER PORT CLOUDINARY_KEY CLOUDINARY_NAME CLOUDINARY_SECRET NODE_ENV ADMIN_JWT_SECRET JWT_SECRET API_TOKEN_SALT=4ca1f272d08361f63d9fefd4a4df5c98
# ENV PGDATABASE=$PGDATABASE PGHOST=$PGHOST PGPASSWORD=$PGPASSWORD PGPORT=$PGPORT PGUSER=$PGUSER PORT=$PORT CLOUDINARY_KEY=$CLOUDINARY_KEY CLOUDINARY_NAME=$CLOUDINARY_NAME CLOUDINARY_SECRET=$CLOUDINARY_SECRET NODE_ENV=$NODE_ENV ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET JWT_SECRET=$JWT_SECRET API_TOKEN_SALT=$API_TOKEN_SALT

# RUN yarn build
# EXPOSE $PORT
# CMD yarn start