import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["审核通过, 待邮箱验证", "验证完成, 待分配", "分配成功"];

export default function ProgressStepper(props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={props.progress} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
