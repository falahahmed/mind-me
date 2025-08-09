'use client';

export function Loading() {
    const color = 'blue';
    const colorClasses = {
        blue: 'bg-blue-600',
        gray: 'bg-gray-600',
        green: 'bg-green-600',
        purple: 'bg-purple-600',
        red: 'bg-red-600'
    };

    return (
        <div>
        {/* <div className="flex items-center justify-center space-x-2">
             <div className={`w-2 h-2 ${colorClasses[color]} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
             <div className={`w-2 h-2 ${colorClasses[color]} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
             <div className={`w-2 h-2 ${colorClasses[color]} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div> */}
            </div>
            );
}