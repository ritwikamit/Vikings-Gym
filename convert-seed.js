const fs = require('fs');
let seed = fs.readFileSync('prisma/seed.ts', 'utf8');

seed = seed.replace(/certifications:\s*\[([^\]]+)\]/g, 'certifications: [$1].join(",")');
seed = seed.replace(/specialization:\s*\[([^\]]+)\]/g, 'specialization: [$1].join(",")');
seed = seed.replace(/features:\s*\[([^\]]+)\]/g, 'features: [$1].join(",")');
seed = seed.replace(/tags:\s*\[([^\]]+)\]/g, 'tags: [$1].join(",")');

// Remove as const / as any
seed = seed.replace(/as const/g, '');
seed = seed.replace(/as any/g, '');

fs.writeFileSync('prisma/seed.ts', seed);
