export default function AboutUs() {
  return (
    <section className="about page" aria-labelledby="about-title">
      <div className="about-illustration" role="img" aria-label="A bright collection of leafy indoor plants" />
      <div className="about-copy">
        <span className="eyebrow">OUR STORY</span>
        <h2 id="about-title">A little green makes life <em>better.</em></h2>
        <p>Paradise Nursery is an online plant shop inspired by the simple joy of bringing nature into your home.</p>
        <p>We offer a thoughtful selection of indoor greenery for new plant parents and experienced gardeners alike. Explore beautiful, approachable plants and choose the ones that fit your space.</p>
        <div className="values"><span>✳ Carefully selected</span><span>✳ Beginner friendly</span><span>✳ Grown with care</span></div>
      </div>
    </section>
  );
}
