"use client"
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = [
    "Personal Information",
    "Delivery Information",
    "Payment Information",
];
interface HorizontalLinearAlternativeLabelStepperProps {
    activeStep: number;
}

const HorizontalLinearAlternativeLabelStepper: React.FC<HorizontalLinearAlternativeLabelStepperProps> =
    ({ activeStep }) => {
        const steps = [
            "Personal Information",
            "Delivery Information",
            "Payment Information",
        ];

        return (
            <Box sx={{ width: "100%" }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        );
    };

export default HorizontalLinearAlternativeLabelStepper;
