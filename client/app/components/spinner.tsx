const Spinner = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <span className="loading loading-bars loading-lg"></span>
    </div>
  );
};

export default Spinner;
