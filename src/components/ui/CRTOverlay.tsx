"use client";
import React from "react";

export default function CRTOverlay() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {/* Scanlines - very subtle for light theme */}
            {/* Scanlines removed for clear screen */}

            {/* Flicker - reduced */}
            <div className="absolute inset-0 bg-white opacity-[0.01] animate-[flicker_0.15s_infinite]" />

            {/* Vignette - very light */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.05)_100%)]" />
        </div>
    );
}
