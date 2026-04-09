### Aliases

```
alias ll="ls -al"

alias ga='git add'
alias gaa="git add --all"
alias gb='git branch'
alias gc="git checkout"
alias gch='git checkout'
alias gco='git commit'
alias gd="git diff"
alias gds="git diff --staged"
alias gl="git log"
alias gp='git push'
alias gs="git status"

__git_complete gd _git_diff
__git_complete gb _git_branch
__git_complete gc _git_checkout
__git_complete gs _git_status
```

### Functions

```
jqe() {
  jq -C 'walk(if type == "string" and length > 64 then .[0:64] + "..." else . end)' $1 \
    | less -R
}
```

### macOS Brew Completions

```
if [[ -s $BREW_PREFIX/etc/profile.d/bash_completion.sh ]]; then
  . "$BREW_PREFIX/etc/profile.d/bash_completion.sh"
fi

for completion in "$BREW_PREFIX/etc/bash_completion.d/"*
do
  . $completion
done
```
