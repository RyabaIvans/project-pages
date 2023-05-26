import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props: any) => (

  <ContentLoader
    speed={2}
    width={350}
    height={240}
    viewBox="0 0 370 260"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="230" y="297" rx="0" ry="0" width="1" height="0" />
    <rect x="74" y="83" rx="0" ry="0" width="1" height="0" />
    <rect x="0" y="0" rx="0" ry="0" width="370" height="254" />
  </ContentLoader>
);

export default Skeleton;