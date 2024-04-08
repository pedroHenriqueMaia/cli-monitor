#!/usr/bin/env node

import * as os from 'os';

function monitorSystem() {
    const cpuUsage = os.loadavg()[0] / os.cpus().length;
    const freeMemoryGB = os.freemem() / (1024 * 1024 * 1024);
    const totalMemoryGB = os.totalmem() / (1024 * 1024 * 1024);
    const uptimeHours = os.uptime() / 3600;

    let cpuColor;
    if (cpuUsage > 0.8) {
        cpuColor = '\x1b[31m'; // Vermelho
    } else if (cpuUsage > 0.5) {
        cpuColor = '\x1b[33m'; // Amarelo
    } else {
        cpuColor = '\x1b[32m'; // Verde
    }

    let memoryColor;
    const memoryUsagePercentage = (totalMemoryGB - freeMemoryGB) / totalMemoryGB;
    if (memoryUsagePercentage > 0.8) {
        memoryColor = '\x1b[31m'; // Vermelho
    } else if (memoryUsagePercentage > 0.5) {
        memoryColor = '\x1b[33m'; // Amarelo
    } else {
        memoryColor = '\x1b[32m'; // Verde
    }

    console.log(cpuColor + 'CPU Usage (%):', cpuUsage * 100);
    console.log(memoryColor + 'Free Memory (GB):', freeMemoryGB);
    console.log('\x1b[0mTotal Memory (GB):', totalMemoryGB);
    console.log('\x1b[0mSystem Uptime (hours):', uptimeHours);
    console.log();
}

const interval = setInterval(monitorSystem, 5000);

setTimeout(() => {
    clearInterval(interval);
    console.log('Monitoramento encerrado.');
}, 60000);
