import { React } from '../../../packages';
import { pencil, stars } from '../../../assets';

export function template(OurReviews) {
  return (
    <div className="OurReviews">
      <h1>Our Reviews</h1>
      <img className="pencil" src={pencil} />
      <div className="review">
        <h2>Trevor Erikson</h2>
        <h2>Wow! The absolute best around!</h2>
        <img src={stars} />
        <p>
          I’ve worked with Textile Graphix several times now and they always
          seem to go above and beyond my expectations. I have personally met
          the crew and they strive for perfection on each shirt that they print.
          Keep killing it!
        </p>
      </div>
      <div className="review">
        <h2>Jane Smith</h2>
        <h2>Title of Review</h2>
        <img src={stars} />
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiat nulla facilisis at
          vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
        </p>
      </div>
    </div>
  );
}
