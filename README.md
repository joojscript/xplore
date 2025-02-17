<!-- PROJECT LOGO -->
<br />
<div align="center" id="readme-top">
  <a href="https://github.com/joojscript/xplore">
    <img src="apps/ui/public/xplore-logo.png" alt="Logo" width="200" height="200">
  </a>

  <h3 align="center">Xplore</h3>

  <p align="center">
    Find the best way to meet the world, in person!
    <br />
    <a href="https://youtu.be/8dukGid1mE0"><strong>Quick Explanation »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    &middot;
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

![Xplore Desktop](https://github.com/joojscript/xplore/blob/main/.github/assets/app_screenshot_desktop.png?raw=true)

Xplore is an application designed to change the way users plan their travel destinations and optimize routes. The tool visualizes the most efficient paths between selected locations worldwide, providing an intuitive and interactive experience for globetrotters and travel enthusiasts.

Here's why:

* **Interactive World Map:** Select destinations from a visually appealing global map interface.

* **Route Optimization:** Automatically calculate and display the most efficient path between chosen locations.

* **Responsive Design:** Enjoy a seamless experience across various devices and screen sizes.

* **Internationalization:** Support for multiple languages to cater to a global user base.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* **Frontend:** Built with Astro, offering flexibility in rendering processes and optimal performance.

* **Backend:** Powered by Elixir, ensuring scalability and fault-tolerance.

* **Database:** Utilizes Surreal DB for efficient data management.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To spin-up the environment on your local machine, please take a look at the steps below, and make sure you meet all the requirements:

### Prerequisites

You have to have Docker installed and running on your machine, along with the **compose** plugin.

### Installation

_Below is an example of how you can get it running, and after it, migrating the data to the database, making it populated and ready to go_

1. Clone the repo

   ```sh
   git clone https://github.com/joojscript/xplore.git
   ```

2. Make sure all the default values and ports on the `docker-compose.yaml` file works great for you.
3. Add the desired changes (if any) to your local environment variables (either by changing the compose file, at your own risk, or adding it localy to you shell session), and after it, run:

   ```sh
   docker compose up -d
   ```

**Important:** Be careful, the proxy container `nginx` will try to run on port `80`, in the compose file, you'll se the `CAP_ADD` command enabling it, but in some distros, this may cause errors. Because of this, you can set up `STACK_PORT` to any port you want, you'll interact with the application through this port, if set, otherwise, defaults to `80`.

It will build the container images, and run them, you're almost good to go!

4. Migrate data to the containers:

   ```sh
   # Or whatever container name you changed to it
   docker exec -it xplore-core-1 elixir migrate.exs
   ```

5. Access your localhost at port 3000 (default), and you should see it up and running:

![Xplore Mobile](https://github.com/joojscript/xplore/blob/main/.github/assets/app_screenshot_mobile.png?raw=true)

#### Other Available Environment Variables for you to customize your Compose run

_Remember: all of these values have default counterparts, only change them if you intend to_

* `STACK_PORT`: The port in which the Nginx Proxy will run, you'll interact with the application only through here.
* `BACKEND_PORT`: The port in which the Elixir Backend will run.
* `FRONTEND_PORT`: The port in which the Astro+React Frontend will run.
* `SURREALDB_PORT`: The Surreal DB port.
* `SURREALDB_HOSTNAME`: Ths Surreal DB hostname.
* `SURREALDB_USERNAME`: Ths Surreal DB username.
* `SURREALDB_PASSWORD`: Ths Surreal DB password.
* `SURREALDB_DATABASE`: Ths Surreal DB database name.
* `SURREALDB_NAMESPACE`: Ths Surreal DB namespace.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

João Augusto Perin - [@augustooojoao](https://twitter.com/augustooojoao) - <joaoaugustoperin@gmail.com>

Explanation Link: [Youtube Video](https://youtu.be/8dukGid1mE0)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
