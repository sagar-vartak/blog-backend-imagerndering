# blog-backend-imagerndering

## INFO

This is a backend for a Blog-Backend which saves data in a mongoDb. Basic crud operations are present in this backend. Also it takes an image file.

## Setup

1. Clone the repositary
2. Install all the dependencies by using command
   - npm install
     (this will install all the dependencies)
3. There is an 'config.env' file which has the data base url
4. If you want to change the url just go in config.env and enter the desired database name
   - mongodb://127.0.0.1:27017/"database Name"
   - Now the default database Name is "blogBackendimage"
5. The default port no. is 4000
6. Use Postman for the following crud operations
7. Now the diffrent crud operations are given below
   1. GET request
      - http://localhost:4000/all // get all the blogs
   2. POST request
      - http://localhost:4000/add //add a blog
   3. DELETE request
      - http://localhost:4000/:blogId //delete a particular blog (pass the blog id in query params)
   4. GET request
      - http://localhost:4000/:blogId //to get a particular blog(pass the blog id in query params)
8. Data should be put in the below format in body parameters form-data
   - author: 'Author name',
     title: 'Title of blog',
     content: 'content of blog',
     imageUrl: 'image-name.jpg',(type=File)
   - image type can be jpeg,jpg,png
   - database will have the path of the image
   - to get the image the link will be
     - http://localhost:4000/images/image-name.jpg
     - To view image just paste the link with GET request in postman or directly paste in chrome browser
