import { Reactive } from "vue";

export type ChipFilterItem = Reactive<{
    id: string;
    name: string;
    isSelected: boolean;
    isDisabled: boolean;
    isHidden: boolean;
}>;
