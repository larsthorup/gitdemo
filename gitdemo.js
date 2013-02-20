gitInit();
createBranch('product-trunk');

inBranch('product-trunk', function () {
    commitChangesetFile('p1', 'salary.js', ['function salary() {', '  return 500;', '}']);
    commitChangeset('p2');
});

inBranch('product-trunk', function () {
    createBranch('wellmark-trunk');
});

inBranch('wellmark-trunk', function () {
    commitChangeset('w1');
});

inBranch('product-trunk', function () {
    commitChangeset('p3');
    commitChangeset('p4');
});

mergeFrom('product-trunk', 'wellmark-trunk');

// release branch demo

inBranch('wellmark-trunk', function () {
    tag('releaseTag'); // Note: this can be done later by specifying a commitId
});

inBranch('product-trunk', function () {
    createBranch('product-release');
});

inBranch('product-trunk', function () {
    commitChangeset('p5');
    commitChangeset('p6');
})

inBranch('wellmark-trunk', function () {
    commitChangeset('w2');
});

mergeFrom('product-trunk', 'wellmark-trunk');

inBranch('product-release', function () {
    commitChangeset('pr1');
});

createBranchFromTag('wellmark-release', 'releaseTag');

// conflict demo

inBranch('product-trunk', function () {
    commitChangesetFile('p7', 'salary.js', ['function salary() {', '  return 700;', '}']);
});

inBranch('wellmark-trunk', function () {
    commitChangesetFile('w3', 'salary.js', ['function salary() {', '  return 800;', '}']);
    mergeFrom('product-trunk', 'wellmark-trunk');
    console.log('type salary.js'); // displays the file with the conflict markers
    createFile('salary.js', ['function salary() {', '  if(typeof salary_custom === \'function\') {', '   return salary_custom()', '  } else {', '    return 700;', '  }', '}']);
    createFile('salary_custom.js', ['function salary_custom() {', '  return 800;', '}']);
    createPatchFile();
    revertToHead();
});


///////////////////////////////////////////////////////

function revertToHead() {
    console.log('git reset --hard HEAD');
}

function createPatchFile() {
    console.log('git diff --cached');
}

function createFile(fileName, fileLines) {
    console.log('echo "' + fileLines[0] + '" > ' + fileName);
    for(var i = 1; i < fileLines.length; ++i) {
        console.log('echo "' + fileLines[i] + '" >> ' + fileName);
    }
    console.log('git add ' + fileName);
}

function commitChangesetFile(name, fileName, fileLines) {
    createFile(fileName, fileLines);
    console.log('git commit -m ' + name);
}

function createBranchFromTag(branch, tag) {
    console.log('git checkout -b ' + branch + ' ' + tag);
}

function tag(name) {
    console.log('git tag ' + name);
}

function mergeFrom(source, target) {
    inBranch(target, function () {
        console.log('git merge ' + source);
    });
}

function inBranch(name, block) {
    console.log('git checkout ' + name);
    block();
}

function commitChangeset(name) {
    commitChangesetFile(name, name + '.txt', [name]);
}

function createBranch(name) {
    console.log('git checkout -b ' + name);
}

function gitInit() {
    console.log('git init');
    commitChangeset('init');
}