import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonLoading = () => {
  return (
    <section className="container">
      <div className="section-title">
        <Skeleton duration={1} height={100} width={`30%`} />
      </div>
      <div className="card-image">
        <Skeleton height={30} width={`30%`} />
      </div>
      <div className="section-title">
        <Skeleton height={10} width={`60%`} />
        <Skeleton height={10} width={`60%`} />
        <Skeleton height={10} width={`60%`} />
      </div>
      <div className="section-title">
        <Skeleton height={40} width={`10%`} />
      </div>
    </section>
  );
};

export default SkeletonLoading;
