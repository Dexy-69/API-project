
export default function About() {
  return (
    <>
      <div className="about-container">
        <h3>Welcome to our platform!: </h3>
        <p>
          Our idea is simple but powerful: we make it easier for you to create and manage your WordPress content from one place — faster, smoother, and without the usual hassle.

          Instead of navigating through the traditional WordPress dashboard, our platform allows you to:

          Log in securely

          Access your own personal workspace

          Design and customize your posts the way you like

          Publish them directly to your WordPress site using the API

          Our goal is to give you a clean, comfortable, and efficient content-creation experience, without requiring any technical background.

          We believe your content is your voice — and our mission is to help you share that voice with the world
        </p>

        <h3>The techniques we used:</h3>
        <div className="techniques-contianer">
          <div className="python-card">
            <img src="/Python.png" className="react-img" />
          </div>
          <div className="react-card">
            <img src="/React.png" className="python-img" />
          </div>
        </div>
      </div>
    </>
  )
}
