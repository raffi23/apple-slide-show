import clsx from "clsx";

const BlueCircle = () => {
  return (
    <div
      id="blue"
      className={clsx(
        "absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -z-10",
        "rounded-full h-14 w-14",
        "bg-blue-500"
      )}
    />
  );
};

export default BlueCircle;
