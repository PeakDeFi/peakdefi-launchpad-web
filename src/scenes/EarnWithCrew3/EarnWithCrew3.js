import classes from "./EarnWithCrew3.module.scss";

const EarnWithCrew3 = () => {
  return (
    <div className={classes.EarnWithCrew3}>
      <heading className={classes.heading}>
        Earn up to 2100 BUSD monthly!
      </heading>
      <heading className={classes.subheading}>
        On CREW3 you can finalize simple tasks for PEAKDEFI and earn money every
        month!
      </heading>

      <iframe
        className={classes.video}
        src="https://www.youtube.com/embed/Fk7T9Gibou8"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <button
        className={classes.ctaButton}
        onClick={() => {
          window.open(
            "https://crew3.xyz/c/peakdeficommunity/invite/m20mqr_pjBUFS8y_En2nY"
          );
        }}
      >
        GET COMMUNITY REWARDS WITH CREW3 NOW
      </button>
    </div>
  );
};

export default EarnWithCrew3;
