import React from 'react'

const Card = ({ video, title, description }) => {
    return (
        <div class="p-10">
            <div class="max-w-xs mx-h-xs rounded overflow-hidden border hover:shadow-lg">
                {video}
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{title}</div>
                    <p class="text-gray-700 text-base">
                        {description}
                    </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
            </div>
        </div>
    )
}

export default Card;
