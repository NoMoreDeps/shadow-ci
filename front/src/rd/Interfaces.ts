export interface Pipeline {
  define : (name: string, body: (source: this) => void) => this;
  inject: <T>() => this & T ;
  run : () => void ;
}

export interface Git {
  Git : {
    clone    : (path: string) => void ;
    checkout : (path: string) => void ;
  }
}

export interface Shell {
  Shell : {
    sh: (literals: TemplateStringsArray, ...placeholders: string[]) => void;
  }
}

export interface Node {
  Node : {
    yarn : (literals: TemplateStringsArray, ...placeholders: string[]) => void ;
    npm  : (literals: TemplateStringsArray, ...placeholders: string[]) => void ;
    node : (literals: TemplateStringsArray, ...placeholders: string[]) => void ;
  }
}