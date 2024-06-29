import { NO_BORDER, ALL_BORDERS } from "@renderer/shared/config/theme/constants";
import { IBorders } from "@renderer/shared/config/theme/types";

export const setBorder = (componentIsActive: boolean): IBorders => (componentIsActive ? NO_BORDER : ALL_BORDERS)