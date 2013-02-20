cls
rmdir /s /q gitdemo
mkdir gitdemo
node gitdemo.js > gitdemo\gitdemo.cmd
pushd gitdemo
call gitdemo.cmd
call gitk --all
popd
