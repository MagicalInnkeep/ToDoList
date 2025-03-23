
export async function loadSettings() {
    try {
        const response = await fetch('/settings.json');  // Fetch from public path
        return await response.json();
    } catch (error) {
        console.error("Error loading settings, using default:", error);
        return {}; // Provide fallback settings
    }
}
