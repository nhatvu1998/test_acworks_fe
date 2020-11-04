import React from "react";
import { ClipLoader } from "react-spinners";
import { LazyLoading } from './styled'

const Loading = () => (
  <LazyLoading>
    <ClipLoader sizeUnit="px" loading size={100} color="#74B1E5" />
  </LazyLoading>
);

export default Loading;
