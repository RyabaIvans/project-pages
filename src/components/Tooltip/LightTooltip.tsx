import {styled, Tooltip, tooltipClasses, TooltipProps} from "@mui/material";
import React from "react";

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#F8F8F8',
        color: '#7E7E7E',
        fontSize: 12,
    },
}));
