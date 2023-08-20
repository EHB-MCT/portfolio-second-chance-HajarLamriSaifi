[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/DhYPBlwE)

# Portfolio - Quotes Poster

**Quotes Poster** is a web app where you can login and post, as well as view various quotes.

## Getting Started

1. **Clone the Repository**
    ```bash
    git clone https://github.com/EHB-MCT/portfolio-second-chance-HajarLamriSaifi.git
    ```

2. **Navigate to Project Directory**
    ```bash
    cd portfolio-second-chance-HajarLamriSaifi
    ```

3. **Build and Start the App using Docker Compose**
    ```bash
    docker-compose up --build
    ```

4. **Initialization Step**: After starting, navigate to `images/api/src/db/db.js` and save the file (`Cmd + S` or `Ctrl + S`). This step ensures the tables get created (Note: This is a workaround due to a known bug).

## Usage

- **Website Access**: Navigate to [http://localhost:8080](http://localhost:8080) in your preferred browser.

## Endpoints

1. **Home**: [http://localhost:80](http://localhost:80)
2. **Users**: To fetch all users, visit [http://localhost:80/users](http://localhost:80/users)
3. **Quotes**: To fetch all quotes, visit [http://localhost:80/quotes](http://localhost:80/quotes)

## Dependencies

- Docker

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Postman](https://www.postman.com/)
- [Knex.js](http://knexjs.org/)
- [Express.js](https://expressjs.com/)
- [Jest](https://jestjs.io/en/)
- [React](https://legacy.reactjs.org/docs/getting-started.html)


## License

This project is released under the MIT License.

## Contact

For any queries, reach out to:

**Hajar Lamri Saifi**  
Email: [hajar.lamri.saifi@student.ehb.be](mailto:hajar.lamri.saifi@student.ehb.be)
