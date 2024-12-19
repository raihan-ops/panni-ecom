/* eslint-disable react/prop-types */
import { Fragment } from 'react';
import { Typography } from '../typography';
// import SmallTitle from "../typography/SmallTitle";

export default function IconBadge(props) {
  return (
    <Fragment>
      <div className="flex gap-2 items-center">
        <img src={props.img} alt="demo" className="relative" />
        <Typography.Text rest="text-xs ">{props.title}</Typography.Text>
      </div>
    </Fragment>
  );
}
