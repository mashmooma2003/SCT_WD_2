document.addEventListener('DOMContentLoaded', function() {
    // [Previous variable declarations remain the same...]

    // Record a lap time - UPDATED FUNCTION
    function recordLap() {
        if (!isRunning) return;
        
        const currentTime = elapsedTime + (Date.now() - startTime);
        lapCount++;
        
        const hours = Math.floor(currentTime / 3600000);
        const minutes = Math.floor((currentTime % 3600000) / 60000);
        const seconds = Math.floor((currentTime % 60000) / 1000);
        const milliseconds = Math.floor((currentTime % 1000) / 10);
        
        // Calculate lap time (current - previous overall time)
        const lapTime = previousLapTime === 0 ? currentTime : currentTime - previousLapTime;
        const lapHours = Math.floor(lapTime / 3600000);
        const lapMinutes = Math.floor((lapTime % 3600000) / 60000);
        const lapSeconds = Math.floor((lapTime % 60000) / 1000);
        const lapMilliseconds = Math.floor((lapTime % 1000) / 10);
        
        // Calculate interval
        let interval = "—";
        let intervalClass = "";
        if (lapCount > 1) {
            const lastLapTime = previousLapTime - (lapCount > 2 ? secondLastLapTime : 0);
            const diff = lapTime - lastLapTime;
            const absDiff = Math.abs(diff);
            
            const diffHours = Math.floor(absDiff / 3600000);
            const diffMinutes = Math.floor((absDiff % 3600000) / 60000);
            const diffSeconds = Math.floor((absDiff % 60000) / 1000);
            const diffMilliseconds = Math.floor((absDiff % 1000) / 10);
            interval = `${diff >= 0 ? '+' : '−'}${formatTime(diffHours)}:${formatTime(diffMinutes)}:${formatTime(diffSeconds)}.${formatMilliseconds(diffMilliseconds)}`;
            intervalClass = diff >= 0 ? 'positive-interval' : 'negative-interval';
        }
        
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `
            <span class="lap-number">${lapCount}</span>
            <div class="lap-info">
                <span class="lap-time">${formatTime(lapHours)}:${formatTime(lapMinutes)}:${formatTime(lapSeconds)}.${formatMilliseconds(lapMilliseconds)}</span>
                <span class="overall-time">${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${formatMilliseconds(milliseconds)}</span>
                <span class="lap-interval ${intervalClass}">${interval}</span>
            </div>
        `;
        
        lapsList.insertBefore(lapItem, lapsList.firstChild);
        secondLastLapTime = previousLapTime;
        previousLapTime = currentTime;
    }

    // [Rest of the code remains the same...]
});