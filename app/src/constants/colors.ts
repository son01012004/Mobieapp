export const colors = {
    Azure_Radiance:  '#4A90E2',
    Light_Sky_Blue:   '#AEDFF7',
    Soft_Blue:   '#83A6CE', 
    Pastel_Gold:  '#FAD7A0', 
    Pastel_Purple:  '#D3BDF2', 
    Dark:  '#666666',
    Black:  '#000000',
    
    White:  '#FFFFFF',
} as const;

export type ColorType = keyof typeof colors;

