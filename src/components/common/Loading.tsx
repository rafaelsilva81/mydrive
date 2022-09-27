export const Loading = () => {
    return (
        /* Loading */
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500"></div>
            <p className="text-teal-600">Loading...</p>
        </div>

    )
}
