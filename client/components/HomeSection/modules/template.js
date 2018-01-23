import { React, Parallax, Background } from '../../../packages';
import { lightGrayArrow, blueArrow } from '../../../assets';

export function template(HomeSection) {
  var icons = HomeSection.props.section.icons.map((icon, i) => {
    return (
      <div style={{width: HomeSection.props.section.iconWidth}} className="icon" key={i}>
        <img src={icon.image} />
        <h2>{icon.description}</h2>
      </div>
    );
  });

  var taglines = HomeSection.props.section.taglines.map((tagline, i) => {
    return (
      <h3 key={i} style={{
        width: HomeSection.props.section.tagsize,
        textAlign: HomeSection.props.section.align
      }}>{tagline}</h3>
    );
  });

  return (
    <Parallax strength={300} className="HomeSection">
      <h1>{HomeSection.props.section.header}</h1>
      <div className="icons">
        {icons}
      </div>
      <div className="no-mans-land"></div>
      <Background>
        <img className="parallax-image" src={HomeSection.props.image} />
      </Background>
      <div className="bottom">
        <a className="prompt" href="/#/shop" onClick={() => HomeSection.setLocation('shop')}
          onMouseOver={HomeSection.setHover} onMouseOut={HomeSection.setHover}>
          <h4>{HomeSection.props.section.prompt}</h4>
          {HomeSection.state.link ? (
            <img src={blueArrow} />
          ) : (
            <img src={lightGrayArrow} />
          )}
        </a>
        <div className="taglines">
          {taglines}
        </div>
      </div>
    </Parallax>
  );
}
