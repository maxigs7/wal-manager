import bgImage from 'assets/img/auth-bg.png';

const admin = () => (
  <main>
    <section className="relative w-full h-full py-40 min-h-screen">
      <div
        className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
        style={{
          backgroundImage: 'url(' + bgImage + ')',
        }}
      ></div>
      <p>ADMIN</p>
    </section>
  </main>
);

export default admin;
