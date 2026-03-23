git config --global alias.st 'status'
git config --global alias.rpull 'pull --rebase --stat'
git config --global alias.wdiff "diff --word-diff=color"
git config --global user.email 'mjc@hey.com'
git config --global user.name 'Michael Coyne'

git config --global core.pager delta
git config --global interactive.diffFilter 'delta --color-only'
git config --global delta.navigate true
git config --global delta.dark true  # or `delta.light true`, or omit for auto-detection
git config --global merge.conflictStyle zdiff3
