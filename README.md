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
```

### Functions

```
jqe() {
  jq -C 'walk(if type == "string" and length > 64 then .[0:64] + "..." else . end)' $1 \
    | less -R
}
```

### Bash complete-alias

```
git clone https://github.com/cykerway/complete-alias.git ~/.complete-alias
```

Add to `.bashrc`

```
# Source tab completion
source /usr/share/bash-completion/bash_completion

if [ -f ~/.complete-alias/complete_alias ]; then
    . ~/.complete-alias/complete_alias
fi

complete -F _complete_alias ll

complete -F _complete_alias ga
complete -F _complete_alias gaa
complete -F _complete_alias gb
complete -F _complete_alias gc
complete -F _complete_alias gch
complete -F _complete_alias gco
complete -F _complete_alias gd
complete -f _complete_alias gds
complete -F _complete_alias gl
complete -F _complete_alias gp
complete -F _complete_alias gs
```

### macOS Git Brew Completions

In `.bashrc`

```
if [[ -s $BREW_PREFIX/etc/profile.d/bash_completion.sh ]]; then
  . "$BREW_PREFIX/etc/profile.d/bash_completion.sh"
fi

for completion in "$BREW_PREFIX/etc/bash_completion.d/"*
do
  . $completion
done

__git_complete gd _git_diff
__git_complete gb _git_branch
__git_complete gc _git_checkout
__git_complete gs _git_status
```
