import { cn } from "@/lib/utils";

interface ZapziveLogoProps {
    className?: string;
    size?: "sm" | "md" | "lg";
}

export const ZapziveLogo = ({ className, size = "md" }: ZapziveLogoProps) => {
    // Sizing now controls WIDTH to preserve aspect ratio and prevent navbar height explosion
    // sm (Navbar) -> 130px width
    const imgWidth = size === "sm" ? 130 : size === "lg" ? 200 : 150;

    // For navbar (sm), we need to crop the square logo's visual height
    const containerHeight = size === "sm" ? "h-10" : "h-auto";
    const containerWidth = size === "sm" ? "w-[130px]" : "w-auto";

    return (
        <div className={cn("flex items-center gap-2 cursor-pointer", className)}>
            <div className={cn("relative overflow-hidden flex items-center justify-center", containerHeight, containerWidth)}>
                <img
                    src="/zapzive-logo.png"
                    alt="Zapzive"
                    style={{ width: imgWidth, maxWidth: "none" }}
                    className={cn("object-contain", size === "sm" && "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2")}
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />
            </div>
        </div>
    );
};
