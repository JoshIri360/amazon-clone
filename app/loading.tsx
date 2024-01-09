const loading = () => {
  return (
    <div id="cooking-div">
      <h1 id="cooking-title">Cooking in progress..</h1>
      <div id="cooking">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
        <div id="area">
          <div id="sides">
            <div id="pan"></div>
            <div id="handle"></div>
          </div>
          <div id="pancake">
            <div id="pastry"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
