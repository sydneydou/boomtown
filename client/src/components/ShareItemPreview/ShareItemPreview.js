import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ItemCard from "../ItemCard/ItemCard";
import { connect } from "react-redux";

const ShareItemPreview = ({ shareItemPreview }) => {
  return (
    <div>
      <ItemCard item={shareItemPreview}/>
    </div>
  );
};

const mapStateToProps = ({ shareItemPreview }) => {
  return {
    shareItemPreview
  };
};

export default connect (mapStateToProps)(ShareItemPreview);
