import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
// import { useNavigate } from "react-router-dom";

export default function FreshmenProgress() {
  //   const navigate = useNavigate();
  return (
    <div class="row spacing">
      <div class="col-md-1 mb-3"> </div>
      <div class="col-md-10 mb-3">
        <h2> Your current progress</h2>
        <br />
        <ProgressBar
          percent={30}
          filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
        >
          <Step transition="scale">
            {({ accomplished }) => (
              <div>
                <img
                  style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                  width="30"
                  src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/9d/Pichu.png/revision/latest?cb=20170407222851"
                />
                <br />
                <label> 信息已注册</label>
              </div>
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <div>
                <img
                  style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                  width="30"
                  src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/97/Pikachu_%28Smiling%29.png/revision/latest?cb=20170410234508"
                />
                <br />
                <label> 志愿者已选择</label>
              </div>
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <div>
                <img
                  style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                  width="30"
                  src="https://orig00.deviantart.net/493a/f/2017/095/5/4/raichu_icon_by_pokemonshuffle_icons-db4ryym.png"
                />
                <br />
                <label> 审核通过</label>
              </div>
            )}
          </Step>

          <Step transition="scale">
            {({ accomplished }) => (
              <div>
                <img
                  style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                  width="30"
                  src="https://orig00.deviantart.net/493a/f/2017/095/5/4/raichu_icon_by_pokemonshuffle_icons-db4ryym.png"
                />
                <br />
                <label></label>
              </div>
            )}
          </Step>
        </ProgressBar>
      </div>
      <div class="col-md-1 mb-3"> </div>
    </div>
  );
}
